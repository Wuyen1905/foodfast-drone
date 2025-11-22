import React from "react";

type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown) {
    return { hasError: true, message: err instanceof Error ? err.message : String(err) };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h3>Đã có lỗi xảy ra</h3>
          <div style={{ color: "#b00", marginTop: 8 }}>{this.state.message}</div>
          <p>Vui lòng tải lại trang hoặc thử lại sau.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

