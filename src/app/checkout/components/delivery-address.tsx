/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useGetAddressesQuery } from "@/redux/features/customer/customer-api";
import { useEffect, useState } from "react";
import { Edit2, MapPin, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TextInput } from "@/components/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useAddAddressMutation } from "@/redux/features/customer/customer-api";
import { Address } from "@/app/(user-dashboard)/delivery-address/page";

const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  // street: z.string().min(5, "Street address is required"),
  // city: z.string().min(2, "City is required"),
  // state: z.string().min(2, "State is required"),
  // country: z.string().min(2, "Country is required"),
  // zip: z.string().min(4, "Valid ZIP code is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const DeliveryAddress = ({
  setSelectedAddress,
  selectedAddress,
  error,
}: {
  setSelectedAddress: (address: Address | null) => void;
  selectedAddress: Address | null;
  error: string | undefined;
}) => {
  const {
    data: { data: { addresses = [] } = {} } = {},
    // ...getAddressesState
  } = useGetAddressesQuery({});
  const [addAddress, addAddressState] = useAddAddressMutation();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      address: "",
      // street: "",
      // city: "",
      // state: "",
      // country: "",
      // zip: "",
    },
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr: Address) => addr.isDefault);
      setSelectedAddress(defaultAddress || null);
    }
  }, [addresses]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(
      addresses.find((addr: Address) => addr._id === addressId) || null
    );
    setIsAddressModalOpen(false);
  };

  const formReset = () => {
    form.reset({
      name: "",
      contactNumber: "",
      address: "",
      // street: "",
      // city: "",
      // state: "",
      // country: "",
      // zip: "",
    });
  };

  useEffect(() => {
    if (addAddressState.isSuccess) {
      setShowAddressForm(false);
      formReset();
    }
  }, [addAddressState]);

  const handleAddNewAddress = (values: AddressFormValues) => {
    addAddress(values);
  };

  // console.log(error);

  return (
    <Card className="bg-transparent border-primary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Delivery Address</CardTitle>
        <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
          {selectedAddress && (
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20"
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit address</span>
              </Button>
            </DialogTrigger>
          )}
          {!selectedAddress && (
            <DialogTrigger asChild>
              <Button
                onClick={() => setShowAddressForm(true)}
                variant="outline"
              >
                Add Address
              </Button>
            </DialogTrigger>
          )}
          <DialogContent
            hiddenDefaultCloseButton
            className="sm:max-w-[550px] rounded-lg max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <DialogHeader className="sticky top-0">
              <div className="flex items-center justify-between">
                <DialogTitle>
                  {showAddressForm ? "Add New Address" : "Select Address"}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsAddressModalOpen(false);
                    setShowAddressForm(false);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </DialogHeader>
            <div className="mt-4">
              {!showAddressForm ? (
                <>
                  <RadioGroup
                    value={selectedAddress?._id}
                    onValueChange={handleAddressSelect}
                    className="space-y-4"
                  >
                    {addresses.map((address: Address) => (
                      <div
                        key={address._id}
                        onClick={() => {
                          setIsAddressModalOpen(false);
                          setShowAddressForm(false);
                        }}
                        className="flex items-start space-x-3 rounded-lg border border-primary/20 p-4 hover:border-primary/40"
                      >
                        <RadioGroupItem
                          value={address._id}
                          id={address._id}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={address._id}
                          className="flex-1 cursor-pointer space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {address.contactNumber}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {address.address}
                          </div>
                        </Label>
                      </div>
                    ))}
                    {addresses.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">
                          No addresses found
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          You haven&apos;t added any delivery addresses yet. Add
                          one to continue with checkout.
                        </p>
                      </div>
                    )}
                  </RadioGroup>
                  <Button
                    className="mt-4 w-full border-primary text-primary hover:bg-primary hover:text-white"
                    variant="outline"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Add New Address
                  </Button>
                </>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleAddNewAddress)}
                    className="space-y-8"
                  >
                    <div className="grid gap-4 py-4">
                      <TextInput
                        label="Full Name"
                        placeholder="Enter full name"
                        control={form.control}
                        name="name"
                      />

                      <TextInput
                        label="Contact Number"
                        placeholder="Enter contact number"
                        control={form.control}
                        name="contactNumber"
                      />

                      <TextInput
                        label="Address"
                        placeholder="Enter your address"
                        control={form.control}
                        name="address"
                      />
                      {/* <TextInput
                        label="Country"
                        placeholder="Enter country"
                        control={form.control}
                        name="country"
                      />
                      <TextInput
                        label="City"
                        placeholder="Enter city"
                        control={form.control}
                        name="city"
                      />

                      <TextInput
                        label="State"
                        placeholder="Enter state"
                        control={form.control}
                        name="state"
                      />
                      <TextInput
                        label="Street Address"
                        placeholder="Enter street address"
                        control={form.control}
                        name="street"
                      />

                      <TextInput
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                        control={form.control}
                        name="zip"
                      /> */}
                    </div>
                    <DialogFooter className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          formReset();
                          setShowAddressForm(false);
                        }}
                        className="flex-1 border-primary/20 hover:bg-primary/5"
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={addAddressState.isLoading}
                        isLoading={addAddressState.isLoading}
                        loadingText="Saving..."
                        className="min-w-[120px] flex-1"
                        type="submit"
                      >
                        Save Address
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {selectedAddress && (
          <div className="rounded-lg border border-primary bg-primary/5 p-4">
            <div className="font-medium">{selectedAddress.name}</div>
            <div className="text-sm text-muted-foreground">
              {selectedAddress.contactNumber}
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedAddress.address}
            </div>
          </div>
        )}
        {!selectedAddress && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <div className="text-sm font-medium text-muted-foreground">
              No delivery address selected
            </div>
            <div className="text-xs text-muted-foreground">
              Please add a delivery address to continue with your order
            </div>
          </div>
        )}
        {error && (
          <p className="text-destructive mt-2 text-[0.8rem] font-medium">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryAddress;
