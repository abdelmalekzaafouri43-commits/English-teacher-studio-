package com.example

import android.content.Context
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
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
          WorksheetWebViewScreen(
            modifier = Modifier
              .fillMaxSize()
              .padding(innerPadding),
            onPrintRequested = { webView ->
              createWebPrintJob(webView)
            }
          )
        }
      }
    }
  }

  private fun createWebPrintJob(webView: WebView) {
    val printManager = getSystemService(Context.PRINT_SERVICE) as? PrintManager ?: return
    val printAdapter = webView.createPrintDocumentAdapter("Worksheet_Document")
    val jobName = getString(R.string.app_name) + " Document"
    printManager.print(jobName, printAdapter, PrintAttributes.Builder().build())
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

@Composable
fun WorksheetWebViewScreen(
  modifier: Modifier = Modifier,
  onPrintRequested: (WebView) -> Unit
) {
  AndroidView(
    modifier = modifier,
    factory = { context ->
      WebView(context).apply {
        setLayerType(WebView.LAYER_TYPE_SOFTWARE, null)
        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          useWideViewPort = true
          loadWithOverviewMode = true
          builtInZoomControls = true
          displayZoomControls = false
          mediaPlaybackRequiresUserGesture = false
          mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
        }

        var currentWebView: WebView? = null
        currentWebView = this

        addJavascriptInterface(WebAppInterface {
          currentWebView?.post {
            currentWebView?.let { onPrintRequested(it) }
          }
        }, "AndroidPrintBridge")

        webChromeClient = object : WebChromeClient() {}
        webViewClient = object : WebViewClient() {}

        loadUrl("file:///android_asset/index.html")
      }
    }
  )
}

