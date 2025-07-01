"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorId: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    // Generate a simple error ID for support reference
    const errorId = Math.random().toString(36).substr(2, 9);
    return { hasError: true, error, errorId };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log technical details for developers, but don't show to users
    console.error("Error Boundary caught an error:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
    });

    // You could also send this to an error reporting service
    // reportError(error, errorInfo, this.state.errorId);
  }

  private getUserFriendlyMessage = (): string => {
    const error = this.state.error;

    if (!error) return "Something unexpected happened";

    // Map common technical errors to user-friendly messages
    if (
      error.message.includes("Network Error") ||
      error.message.includes("fetch")
    ) {
      return "Unable to connect to our servers. Please check your internet connection.";
    }

    if (
      error.message.includes("ChunkLoadError") ||
      error.message.includes("Loading chunk")
    ) {
      return "The app needs to be refreshed. Please reload the page to continue.";
    }

    if (
      error.message.includes("Cannot read prop") ||
      error.message.includes("undefined")
    ) {
      return "Some information is temporarily unavailable. Please try again.";
    }

    if (
      error.message.includes("timeout") ||
      error.message.includes("Timeout")
    ) {
      return "The request is taking longer than expected. Please try again.";
    }

    if (
      error.message.includes("Permission") ||
      error.message.includes("Unauthorized")
    ) {
      return "You don't have permission to access this feature. Please sign in or contact support.";
    }

    if (error.message.includes("quota") || error.message.includes("limit")) {
      return "You've reached a usage limit. Please try again later or upgrade your plan.";
    }

    // Default fallback message
    return "We encountered an unexpected issue. Our team has been notified and is working on a fix.";
  };

  private getActionButton = () => {
    const error = this.state.error;

    if (
      error?.message.includes("ChunkLoadError") ||
      error?.message.includes("Loading chunk")
    ) {
      return (
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          Reload Page
        </button>
      );
    }

    if (
      error?.message.includes("Network Error") ||
      error?.message.includes("fetch")
    ) {
      return (
        <div className="space-y-3">
          <button
            onClick={() =>
              this.setState({ hasError: false, error: null, errorId: "" })
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg mr-3"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors shadow-lg"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() =>
          this.setState({ hasError: false, error: null, errorId: "" })
        }
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
      >
        Try Again
      </button>
    );
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>

            {/* User-friendly message */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {this.getUserFriendlyMessage()}
            </p>

            {/* Action buttons */}
            <div className="mb-6">{this.getActionButton()}</div>

            {/* Support info */}
            <div className="text-sm text-gray-500 border-t pt-4">
              <p>Still having trouble?</p>
              <p className="mt-1">
                Contact support with error ID:
                <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">
                  {this.state.errorId}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
