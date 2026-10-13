import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
};

type ApiState = "checking" | "available" | "unavailable";

function App() {
  const [apiState, setApiState] = useState<ApiState>("checking");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/actuator/health", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Health endpoint returned ${response.status}`);
        }
        return (await response.json()) as HealthResponse;
      })
      .then(({ status }) => {
        setApiState(status === "UP" ? "available" : "unavailable");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setApiState("unavailable");
      });

    return () => controller.abort();
  }, []);

  const statusLabel = {
    checking: "Đang kiểm tra",
    available: "Đang hoạt động",
    unavailable: "Chưa kết nối",
  }[apiState];

  return (
    <main className="page">
      <section className="hero" aria-labelledby="page-title">
        <span className="eyebrow">NỀN TẢNG GIAO DỊCH NGÂN HÀNG</span>
        <h1 id="page-title">Banking Transactions Platform</h1>
        <p className="intro">
          Bộ khung phát triển theo modular monolith, sẵn sàng mở rộng cho các
          nghiệp vụ thanh toán, chuyển tiền và sổ cái.
        </p>

        <div className="status" role="status" aria-live="polite">
          <span className={`status-dot status-dot--${apiState}`} />
          API: {statusLabel}
        </div>
      </section>

      <section className="notice" aria-label="Lưu ý">
        <strong>Chỉ dùng cho phát triển và tham khảo.</strong>
        <span>
          Chưa triển khai nghiệp vụ xử lý tiền thật, xác thực người dùng hay kết
          nối mạng thanh toán.
        </span>
      </section>
    </main>
  );
}

export default App;
