/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { CreditCard, Truck, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeliveryAddress from "./delivery-address";
import { CartProductCard } from "@/components/common/cart-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Address } from "@/app/(user-dashboard)/delivery-address/page";
import { useCreateOrderMutation } from "@/redux/features/order/order-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/features/cart/cart-slice";
// TODO: stripe payment will implemented later
// import { useCreateStripeCheckoutSessionMutation } from "@/redux/features/payment/payment-api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { TooltipMessage } from "@/components/tooltips";
import { SHIPPING_AREAS } from "@/constants";

const orderSchema = z.object({
  cart: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().min(1, "Quantity must be greater than 0"),
    })
  ),
  deliveryInfo: z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      contactNumber: z.string().min(10, "Please enter a valid phone number"),
      address: z.string().min(5, "Address is required"),
      // street: z.string().min(5, "Street address is required"),
      // city: z.string().min(2, "City is required"),
      // state: z.string().min(2, "State is required"),
      // country: z.string().min(2, "Country is required"),
      // zip: z.string().min(4, "Valid ZIP code is required"),
    })
    .refine(
      (values) => {
        // console.log("values", values);
        if (Object.values(values).includes("")) {
          return false;
        }
        return true;
      },
      {
        message: "Delivery information is required",
      }
    ),
  shippingArea: z.string().min(1, "Shipping area is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

type CheckoutFormValues = z.infer<typeof orderSchema>;

export default function Checkout() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      cart: [],
      deliveryInfo: {
        name: "",
        contactNumber: "",
        address: "",
        // street: "",
        // city: "",
        // state: "",
        // country: "",
        // zip: "",
      },
      shippingArea: "",
      paymentMethod: "cod",
    },
  });

  const [createOrder, createOrderState] = useCreateOrderMutation();
  // TODO: stripe payment will implemented later
  // const [createStripeCheckoutSession, createStripeCheckoutSessionState] =
  //   useCreateStripeCheckoutSessionMutation();
  const products = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const shippingCost =
    form.watch("shippingArea") === SHIPPING_AREAS.insideDhakaCity.value
      ? SHIPPING_AREAS.insideDhakaCity.shippingCharge
      : form.watch("shippingArea") === SHIPPING_AREAS.outsideDhakaCity.value
      ? SHIPPING_AREAS.outsideDhakaCity.shippingCharge
      : 0;
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (selectedAddress) {
      form.setValue("deliveryInfo", selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (products.length > 0) {
      const transformedProducts = products.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      form.setValue("cart", transformedProducts);
    }
  }, [products]);

  // console.log("form errors", form.formState.errors);

  const updateQuantity = (id: string, change: number) => {
    dispatch(updateCartQuantity({ _id: id, quantity: change }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const onSubmit = (values: CheckoutFormValues) => {
    values.cart.push({
      productId: "672e17429f547b0e1178af89",
      quantity: 1,
    });
    createOrder(values);
  };

  // console.log("error", createOrderStatus.error, createOrderStatus.data);

  // TODO: stripe payment will implemented later
  // const handleStripeCheckout = async () => {
  //   const response = await createStripeCheckoutSession({});
  //   if (response.data) {
  //     window.location.href = response.data.url;
  //   }
  // };

  useEffect(() => {
    if (createOrderState.isSuccess) {
      toast({
        title: "Order created successfully",
      });
      dispatch(clearCart());
      router.push(
        `/orders/${createOrderState?.data?.data?.order?._id}` || "/orders"
      );
    } else if (createOrderState.isError) {
      toast({
        title:
          (createOrderState.error as any)?.data?.message ||
          "An error occurred while creating order",
        variant: "destructive",
      });
      // console.log(createOrderState.error);
      if (Array.isArray((createOrderState.error as any)?.data?.errors)) {
        (createOrderState.error as any)?.data?.errors.map((err: any) => {
          form.setError(err.field, { message: err.message });
        });
      }
    }
  }, [createOrderState.isSuccess, createOrderState.isError]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Forms */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Address */}
              <DeliveryAddress
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
                error={form.formState.errors.deliveryInfo?.message}
              />
              {/* Shipping Method */}
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader className="px-0">
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <RadioGroup
                    onValueChange={(value) => {
                      form.setValue("shippingArea", value);
                      form.clearErrors("shippingArea");
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <Label
                      htmlFor={SHIPPING_AREAS.insideDhakaCity.value}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4 hover:border-primary/40">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value={SHIPPING_AREAS.insideDhakaCity.value}
                            id={SHIPPING_AREAS.insideDhakaCity.value}
                          />
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            {SHIPPING_AREAS.insideDhakaCity.name}
                          </div>
                        </div>
                        <span className="font-medium">
                          {SHIPPING_AREAS.insideDhakaCity.shippingCharge.toFixed(
                            2
                          )}
                          ৳
                        </span>
                      </div>
                    </Label>
                    <Label
                      htmlFor={SHIPPING_AREAS.outsideDhakaCity.value}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4 hover:border-primary/40">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value={SHIPPING_AREAS.outsideDhakaCity.value}
                            id={SHIPPING_AREAS.outsideDhakaCity.value}
                          />
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            {SHIPPING_AREAS.outsideDhakaCity.name}
                          </div>
                        </div>
                        <span className="font-medium">
                          {SHIPPING_AREAS.outsideDhakaCity.shippingCharge.toFixed(
                            2
                          )}
                          ৳
                        </span>
                      </div>
                    </Label>
                  </RadioGroup>
                </CardContent>
                {form.formState.errors.shippingArea && (
                  <p className="text-destructive mt-2 text-[0.8rem] font-medium">
                    {form.formState.errors.shippingArea.message}
                  </p>
                )}
              </Card>

              {/* Payment Method */}
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader className="px-0">
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <RadioGroup
                    onValueChange={(value) => {
                      form.setValue("paymentMethod", value);
                      form.clearErrors("paymentMethod");
                    }}
                    defaultValue="cod"
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <Label htmlFor="cod" className="cursor-pointer">
                      <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4 hover:border-primary/40">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Cash On Delivery
                          </div>
                        </div>
                      </div>
                    </Label>
                    <TooltipMessage message="Stripe payment gateway is not yet implemented">
                      <Label htmlFor="card" className="cursor-not-allowed">
                        <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4 hover:border-primary/40">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem disabled value="card" id="card" />
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Credit Card
                            </div>
                          </div>
                        </div>
                      </Label>
                    </TooltipMessage>
                  </RadioGroup>
                </CardContent>
                {form.formState.errors.paymentMethod && (
                  <p className="text-destructive mt-2 text-[0.8rem] font-medium">
                    {form.formState.errors.paymentMethod.message}
                  </p>
                )}
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Products */}
                  <ScrollArea className="max-h-[220px] overflow-y-auto scrollbar pr-4">
                    <div>
                      {products.map((item) => (
                        <CartProductCard
                          key={item._id}
                          item={item}
                          updateQuantity={updateQuantity}
                          removeItem={removeItem}
                          className="py-2 pb-3"
                        />
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="bg-primary/20" />

                  {/* Coupon - TODO: will be implemented later */}
                  {/* <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      className="border-primary focus:border-primary focus:ring-primary"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Apply
                    </Button>
                  </div>
                  <Separator className="bg-primary/20" /> */}

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{subtotal.toFixed(2)}৳</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Cost</span>
                      <span>{shippingCost.toFixed(2)}৳</span>
                    </div>
                    <Separator className="bg-primary/20" />
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary">{total.toFixed(2)}৳</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      VAT included, where applicable
                    </p>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                    type="submit"
                    disabled={products.length === 0}
                    isLoading={createOrderState.isLoading}
                  >
                    Confirm Order
                  </Button>
                  {/* TODO: stripe payment will implemented later */}
                  {/* <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                    type="button"
                    onClick={handleStripeCheckout}
                  >
                    Pay with Stripe
                  </Button> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
