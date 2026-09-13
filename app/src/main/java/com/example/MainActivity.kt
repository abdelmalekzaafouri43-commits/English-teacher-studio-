package com.example

import android.annotation.SuppressLint
import android.content.Context
import java.io.File
import android.os.Bundle
import android.print.PrintAttributes
import android.print.PrintManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Ensure WebView cache subdirectories exist to prevent Chromium first-run missing directory logs
        runCatching {
            val defaultCacheDir = File(cacheDir, "WebView/Default")
            File(defaultCacheDir, "HTTP Cache/Code Cache/js").mkdirs()
            File(defaultCacheDir, "HTTP Cache/Code Cache/wasm").mkdirs()
            File(defaultCacheDir, "GPUCache").mkdirs()
        }

        setContent {
            MyApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    WorksheetWebViewScreen(
                        modifier = Modifier.fillMaxSize(),
                        onPrintRequested = { webView ->
                            printWorksheet(webView)
                        }
                    )
                }
            }
        }
    }

    private fun printWorksheet(webView: WebView) {
        val printManager = getSystemService(Context.PRINT_SERVICE) as? PrintManager
        val printAdapter = webView.createPrintDocumentAdapter("AI_Tutor_Chat_Export")
        val jobName = "AI Tutor Chat Transcript"
        val attributes = PrintAttributes.Builder()
            .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
            .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
            .build()
        printManager?.print(jobName, printAdapter, attributes)
    }
}

class WebAppInterface(private val onPrint: () -> Unit) {
    @JavascriptInterface
    fun triggerPrint() {
        onPrint()
    }

    @JavascriptInterface
    fun getGeminiApiKey(): String {
        return BuildConfig.GEMINI_API_KEY
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WorksheetWebViewScreen(
    modifier: Modifier = Modifier,
    onPrintRequested: (WebView) -> Unit
) {
    AndroidView(
        modifier = modifier,
        factory = { context ->
            WebView(context).apply {
                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    databaseEnabled = true
                    allowFileAccess = true
                    allowContentAccess = true
                    useWideViewPort = true
                    loadWithOverviewMode = true
                    builtInZoomControls = true
                    displayZoomControls = false
                    mediaPlaybackRequiresUserGesture = false
                    cacheMode = WebSettings.LOAD_DEFAULT
                    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                }
                var webViewRef: WebView? = this
                addJavascriptInterface(WebAppInterface {
                    webViewRef?.post {
                        onPrintRequested(webViewRef ?: this)
                    }
                }, "AndroidPrintBridge")
                webChromeClient = WebChromeClient()
                webViewClient = WebViewClient()
                loadUrl("file:///android_asset/index.html")
            }
        }
    )
}
