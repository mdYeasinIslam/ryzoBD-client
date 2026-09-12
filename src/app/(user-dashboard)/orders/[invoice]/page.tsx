"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Check, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatDateTime } from "@/lib/utils";
import { notFound, useParams } from "next/navigation";
import {
  // useCancelOrderMutation,
  useGetSingleOrderQuery,
} from "@/redux/features/order/order-api";
import { ORDER_STATUS } from "@/constants";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
import InvoicePageLoader from "./components/loading";

export default function InvoicePage() {
  //   const orderStatus = "Processing";
  //   const paymentStatus = "Cash On Delivery";
  const { invoice } = useParams();
  /* TODO: Cancel order option off for user now. The feature is already has. It can be release later */
  // const [isOpenCancelOrderModal, setIsOpenCancelOrderModal] = useState(false);
  // const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: { data: { order = {} } = {} } = {}, ...getOrderState } =
    useGetSingleOrderQuery(invoice);
  // console.log("order", getOrderState);
  // const [cancelOrder, cancelOrderState] = useCancelOrderMutation();
  const steps = [
    {
      id: 1,
      name: "Pending",
      completed:
        order.status === ORDER_STATUS.pending ||
        order.status === ORDER_STATUS.processing ||
        order.status === ORDER_STATUS["at-local-facility"] ||
        order.status === ORDER_STATUS["out-for-delivery"] ||
        order.status === ORDER_STATUS.completed,
      activeBar: { "max-sm": "0%", sm: "0%" },
    },
    {
      id: 2,
      name: "Processing",
      completed:
        order.status === ORDER_STATUS.processing ||
        order.status === ORDER_STATUS["at-local-facility"] ||
        order.status === ORDER_STATUS["out-for-delivery"] ||
        order.status === ORDER_STATUS.completed,
      activeBar: { "max-sm": "25%", sm: "24%" },
    },
    {
      id: 3,
      name: "At Local Facility",
      completed:
        order.status === ORDER_STATUS["at-local-facility"] ||
        order.status === ORDER_STATUS["out-for-delivery"] ||
        order.status === ORDER_STATUS.completed,
      activeBar: { "max-sm": "50%", sm: "48%" },
    },
    {
      id: 4,
      name: "Out For Delivery",
      completed:
        order.status === ORDER_STATUS["out-for-delivery"] ||
        order.status === ORDER_STATUS.completed,
      activeBar: { "max-sm": "75%", sm: "72%" },
    },
    {
      id: 5,
      name: "Completed",
      completed: order.status === ORDER_STATUS.completed,
      activeBar: { "max-sm": "100%", sm: "96%" },
    },
  ];

  const step = [...steps].reverse().find((step) => step.completed);
  /* TODO: Cancel order option off for user now. The feature is already has. It can be release later */
  // const cancelOrderHandler = (orderId: string) => {
  //   setSelectedOrderId(orderId);
  //   setIsOpenCancelOrderModal(true);
  // };

  // console.log(step?.activeBar["max-sm"], step?.activeBar.sm);
  if (getOrderState.isLoading) return <InvoicePageLoader />;
  if (getOrderState.isError) return notFound();
  return (
    <main className="flex-1 px-4">
      <div className="mx-auto space-y-6">
        {/* <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div> */}

        <Card className="relative border-none">
          {/* TODO: Cancel order option off for user now. The feature is already has. It can be release later */}
          {/* <div className="absolute right-6 top-6 flex items-center gap-2">
            {order.status === ORDER_STATUS.pending && (
              <Button
                onClick={() => cancelOrderHandler(order._id)}
                variant="destructive"
              >
                Cancel Order
              </Button>
            )}
            <AlertDialog
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
            </AlertDialog>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Invoice
            </Button>
          </div> */}
          <CardHeader className="flex flex-col gap-4 sm:flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-base sm:text-2xl">
                {order._id}
              </CardTitle>
              <p className="text-sm">{formatDateTime(order.createdAt)}</p>
              <div className="flex items-center gap-2">
                {/* <span className="text-sm text-muted-foreground">Status:</span> */}
                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize",
                    order.status === ORDER_STATUS.completed &&
                      "bg-green-100 text-green-700",
                    order.status === ORDER_STATUS.canceled &&
                      "bg-destructive/10 text-destructive"
                  )}
                >
                  {order.status?.split("-")?.join(" ")}
                </Badge>
                <Badge variant="secondary">
                  {order.paymentStatus === "pending"
                    ? "unpaid"
                    : order.paymentStatus}
                </Badge>
                {/* <Badge variant="secondary">{order.paymentMethod}</Badge> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-left sm:text-right">
                <h3 className="font-medium mb-2">SHIPPING DETAILS</h3>
                <p className="text-sm">{order.deliveryInfo?.name}</p>
                <p className="text-sm">{order.deliveryInfo?.address}</p>
                <p className="text-sm">{order.deliveryInfo?.contactNumber}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Products Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SR.</TableHead>
                  <TableHead>PRODUCT</TableHead>
                  <TableHead className="text-nowrap">PRODUCT NAME</TableHead>
                  <TableHead className="text-center">QUANTITY</TableHead>
                  <TableHead className="text-center text-nowrap">
                    ITEM PRICE
                  </TableHead>
                  <TableHead className="text-right">AMOUNT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.cart.map((product: any, index: number) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={product.featuredImage}
                        alt={product.productName}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span>{product.productName}</span>
                          {product.productType === "package" && (
                            <Badge variant="secondary">Package</Badge>
                          )}
                        </div>
                        {product.productType === "package" &&
                          product.packageProducts?.length > 0 && (
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {product.packageProducts.map((item: any) => (
                                <li key={item.productId}>
                                  {item.productName}: {item.quantityPerPackage} per
                                  package ({item.totalQuantity} total)
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.salePrice}৳
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {product.salePrice * product.quantity}৳
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Payment Summary */}
            <div className="rounded-lg bg-muted/50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-medium mb-2">PAYMENT METHOD</h3>
                  <p className="text-sm">{order.paymentMethod}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">SHIPPING COST</h3>
                  <p className="text-sm">{order.shippingCost}৳</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">DISCOUNT</h3>
                  <p className="text-sm">{order.discount}৳</p>
                </div>
                <div className="text-left md:text-right">
                  <h3 className="font-medium mb-2">TOTAL AMOUNT</h3>
                  <p className="text-2xl font-bold">{order.total}৳</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-none pt-4">
          <CardContent>
            {/* Progress Bar */}
            <div className="space-y-4">
              {order.status !== ORDER_STATUS.canceled && (
                <>
                  <h3 className="font-medium">Order Progress</h3>
                  <div className="relative">
                    <div className="absolute inset-0 w-full flex sm:items-center">
                      <div className="absolute left-4 sm:left-0 sm:top-4 h-full w-0.5 sm:h-0.5 sm:w-[96%] sm:ms-2 bg-gray-200" />
                      <div
                        className={cn(
                          "absolute left-4 sm:left-0 sm:top-4 w-0.5 sm:h-0.5 sm:ms-2 bg-primary",
                          "h-[var(--dynamic-progressbar-height)]",
                          "sm:w-[var(--dynamic-progressbar-width)]"
                        )}
                        style={
                          {
                            "--dynamic-progressbar-width":
                              step?.activeBar["sm"],
                            "--dynamic-progressbar-height":
                              step?.activeBar["max-sm"],
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <div className="relative flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between">
                      {steps.map((step) => (
                        <div
                          key={step.id}
                          className="flex gap-2 sm:gap-0 sm:flex-col items-center"
                        >
                          <div
                            className={`h-8 w-8 p-0.5 rounded-full border-2 flex items-center justify-center
                        ${
                          step.completed
                            ? "bg-primary border-primary"
                            : "bg-background border-muted"
                        }`}
                          >
                            {step.completed ? (
                              <Check className="text-primary-foreground" />
                            ) : (
                              <span className="text-xs font-medium text-muted-foreground">
                                {step.id}
                              </span>
                            )}
                          </div>
                          <span className="mt-2 text-xs font-medium text-center">
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <h3 className="font-medium">Timeline</h3>
              {order.timelineHistory?.length > 0 &&
                order.timelineHistory?.map(
                  (
                    history: {
                      message: string;
                      timestamp: string;
                      reason?: string;
                    },
                    index: number
                  ) => (
                    <div key={index} className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {formatDateTime(history.timestamp)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {history.message}
                        </p>
                      </div>
                    </div>
                  )
                )}
              {/* <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">26 Oct 2024, 11:43 AM</p>
                  <p className="text-sm text-muted-foreground">
                    Order cancelled by - Md Yeasin. Reason: Test
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">26 Oct 2024, 11:42 AM</p>
                  <p className="text-sm text-muted-foreground">
                    Order placed by - Md Yeasin.
                  </p>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>
        {/* Order Issues */}
        {/* TODO: Add order issues reporting feature later */}
        {/* <Card className="border-none shadow-2xl shadow-primary/15">
          <CardHeader>
            <CardTitle>Order Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need help with this order?
            </p>
            <Button variant="secondary">Report Issue</Button>
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
}
