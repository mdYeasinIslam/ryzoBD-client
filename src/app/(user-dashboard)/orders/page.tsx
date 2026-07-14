"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDateTime } from "@/lib/utils";
import {
  // useCancelOrderMutation,
  useGetCustomerOrdersQuery,
} from "@/redux/features/order/order-api";
import { Clock } from "lucide-react";
import Link from "next/link";
import OrderPagination from "./components/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { ORDER_STATUS } from "@/constants";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
import OrderPageLoader from "./components/loading";
import { ORDER_STATUS } from "@/constants";

interface Order {
  _id: string;
  createdAt: string;
  status: string;
  paymentMethod: string;
  total: number;
}

export default function OrdersPage() {
  /* TODO: Cancel order option off for user now. The feature is already has. It can be release later */
  // const [isOpenCancelOrderModal, setIsOpenCancelOrderModal] = useState(false);
  // const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: { data: { orders = [] } = {}, pagination = {} } = {},
    ...getCustomerOrderState
  } = useGetCustomerOrdersQuery({
    limit: 10,
    page: currentPage,
  });
  /* TODO: Cancel order option off for user now. The feature is already has. It can be release later */
  // const [cancelOrder, cancelOrderState] = useCancelOrderMutation();
  // const cancelOrderHandler = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   orderId: string
  // ) => {
  //   e.preventDefault();
  //   setSelectedOrderId(orderId);
  //   setIsOpenCancelOrderModal(true);
  // };

  if (getCustomerOrderState.isLoading || getCustomerOrderState.isFetching) {
    return <OrderPageLoader />;
  }

  if (!orders.length) {
    return (
      <main className="flex-1 px-4">
        <div className="mx-auto">
          <Card className="border-none">
            <CardContent>
              <div className="flex min-h-[250px] flex-col items-center justify-center h-full py-10">
                <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven&apos;t placed any orders yet. Start shopping to see
                  your orders here.
                </p>
                <Link href="/products">
                  <Button className="px-6 py-2">Visit Shop</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4">
      <div className="mx-auto">
        <Card className="border-none">
          <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-3xl font-bold">My Orders</CardTitle>
              <p className="text-muted-foreground mt-1">
                View and track your orders
              </p>
            </div>
            <Badge
              variant="outline"
              className="rounded-full text-nowrap px-2 sm:px-4 py-1 text-sm font-medium border-2"
            >
              {orders.length} Orders
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
            <div className="space-y-4">
              {orders.map((order: Order) => (
                <Link
                  className="block"
                  href={`/orders/${order._id}`}
                  key={order._id}
                >
                  <Card className="hover:bg-accent/50 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap justify-between items-center gap-3">
                          <span className="font-semibold text-sm sm:text-base">
                            {order._id}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "rounded-full px-3 py-1 font-medium capitalize",
                              order.status === ORDER_STATUS.completed &&
                                "bg-green-100 text-green-700",
                              order.status === ORDER_STATUS.canceled &&
                                "bg-destructive/10 text-destructive"
                            )}
                          >
                            {order.status?.split("-")?.join(" ")}
                          </Badge>
                          {/* <Badge
                            variant="outline"
                            className="rounded-full px-3 py-1 font-medium border-2"
                          >
                            {order.paymentMethod}
                          </Badge> */}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {formatDateTime(order.createdAt)}
                          </p>
                          <p className="text-xl font-bold text-muted-foreground">
                            {order.total}৳
                          </p>
                        </div>
                      </div>
                      {/* TODO: Cancel order option off for user now. The feature is already has. It can be release later */}
                      {/* <div className="text-right">
                        {order.status === ORDER_STATUS.pending && (
                          <Button
                            className="px-2 h-8 mb-1"
                            variant="destructive"
                            onClick={(e) => cancelOrderHandler(e, order._id)}
                          >
                            Cancel Order
                          </Button>
                        )}
                      </div> */}
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {/* TODO: Cancel order option off for user now. The feature is already has. It can be release later */}
              {/* <AlertDialog
                open={isOpenCancelOrderModal}
                onOpenChange={setIsOpenCancelOrderModal}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this order? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-primary/20 hover:bg-primary/5">
                      Cancel
                    </AlertDialogCancel>

                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await cancelOrder(selectedOrderId);
                        setIsOpenCancelOrderModal(false);
                      }}
                      disabled={cancelOrderState.isLoading}
                      isLoading={cancelOrderState.isLoading}
                    >
                      Cancel Order
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pt-6 flex justify-end">
                <OrderPagination
                  totalPages={pagination.totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  query={{}}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
