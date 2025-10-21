import { AlertTriangle, RefreshCw } from "lucide-react"

export const ErrorPage = () => {
    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4"
            aria-live="assertive"
        >
            <AlertTriangle className="text-red-500 w-12 h-12" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-red-600">
            Something went wrong while loading videos
            </h2>
            <p className="text-gray-600 max-w-md">
            Please verify your <strong>Google API key</strong> configuration in the
            environment file (<code>.env</code>). Make sure the key is active in the{" "}
            <a
                href="https://console.cloud.google.com/apis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
            >
                Google Cloud Console
            </a>
            .
            </p>
    
            <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
            >
            <RefreshCw className="w-4 h-4" />
            Try again
            </button>
        </div>
    )
}