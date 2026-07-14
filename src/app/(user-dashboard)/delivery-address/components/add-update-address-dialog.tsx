/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/inputs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/features/customer/customer-api";
import { useEffect } from "react";
import { Address } from "../page";

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

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editingAddress: Address | null;
};

const AddAddressForm = ({ isOpen, setIsOpen, editingAddress }: Props) => {
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

  const [addAddress, addAddressState] = useAddAddressMutation();
  const [updateAddress, updateAddressState] = useUpdateAddressMutation();

  const onSubmit = (values: AddressFormValues) => {
    if (editingAddress) {
      updateAddress({ body: values, id: editingAddress._id });
    } else {
      addAddress(values).unwrap();
    }
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
      console.log("riched here", addAddressState);
      setIsOpen(false);
      formReset();
    } else if (updateAddressState.isSuccess) {
      setIsOpen(false);
      formReset();
    }
  }, [addAddressState, updateAddressState]);

  useEffect(() => {
    if (editingAddress) {
      form.reset(editingAddress);
    }
  }, [editingAddress]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        formReset();
        setIsOpen(false);
      }}
    >
      <DialogContent
        // onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
              <DialogDescription>
                {editingAddress
                  ? "Edit delivery address."
                  : "Add a new delivery address."}
              </DialogDescription>
            </DialogHeader>
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
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  formReset();
                  setIsOpen(false);
                }}
                className="border-primary/20 hover:bg-primary/5"
                type="button"
              >
                Cancel
              </Button>
              <Button
                disabled={addAddressState.isLoading}
                isLoading={addAddressState.isLoading}
                loadingText={editingAddress ? "Updating..." : "Saving..."}
                className="min-w-[120px]"
                type="submit"
              >
                {editingAddress ? "Update Address" : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressForm;
