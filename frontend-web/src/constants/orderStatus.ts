export type OrderStatus = "preparing" | "ready" | "cancelled";

export const ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "preparing", label: "Đang chuẩn bị" },
  { value: "ready",     label: "Sẵn sàng" },
  { value: "cancelled", label: "Đã hủy" }
];

export function normalizeStatus(x: string): OrderStatus {
  const s = (x || "").toLowerCase().trim();
  if (["preparing","dang chuan bi","đang chuẩn bị"].includes(s)) return "preparing";
  if (["ready","san sang","sẵn sàng"].includes(s)) return "ready";
  if (["cancelled","canceled","da huy","đã hủy","cancel"].includes(s)) return "cancelled";
  return "preparing";
}

