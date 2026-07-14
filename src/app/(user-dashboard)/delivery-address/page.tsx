"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddUpdateAddressDialog from "./components/add-update-address-dialog";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useSetDefaultAddressMutation,
} from "@/redux/features/customer/customer-api";
import { toast } from "@/hooks/use-toast";
import DeliveryPageLoader from "./components/loading";

export interface Address {
  _id: string;
  name: string;
  contactNumber: string;
  isDefault: boolean;
  address: string;
  // street: string;
  // city: string;
  // state: string;
  // country: string;
  // zip: string;
}

export default function DeliveryAddressPage() {
  const { data: { data: { addresses = [] } = {} } = {}, ...getAddressesState } =
    useGetAddressesQuery({});
  const [deleteAddress, deleteAddressState] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log("isOpenModal", isOpenModal);

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress({ ...address });
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (deleteAddressState.isError) {
      toast({
        title: (deleteAddressState.error as any).data.message,
        variant: "destructive",
      });
    }
  }, [deleteAddressState]);

  // if (!addresses.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-full py-10">
  //       <h2 className="text-2xl font-bold mb-4">No Addresses Found</h2>
  //       <p className="text-muted-foreground mb-6">
  //         You haven&apos;t added any delivery addresses yet. Please add a new
  //         address to proceed.
  //       </p>
  //       <Button
  //         className="px-6 py-2"
  //         onClick={() => {
  //           setEditingAddress(null);
  //           setIsOpenModal(true);
  //         }}
  //       >
  //         Add Address
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <>
      <AddUpdateAddressDialog
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        editingAddress={editingAddress}
      />
      {getAddressesState.isLoading || getAddressesState.isFetching ? (
        <DeliveryPageLoader />
      ) : (
        <main className="flex-1 px-4">
          <div className="mx-auto">
            <Card className="border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-2xl font-bold">
                  Delivery Address
                </CardTitle>
                <Button
                  variant="default"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => {
                    setEditingAddress(null);
                    setIsOpenModal(true);
                  }}
                >
                  Add Address
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {addresses.length === 0 ? (
                    // <div className="col-span-2 flex flex-col text-center items-center justify-center h-full py-10">
                    //   <h2 className="text-2xl font-bold mb-4">
                    //     No Addresses Found
                    //   </h2>
                    //   <p className="text-muted-foreground mb-6">
                    //     You haven&apos;t added any delivery addresses yet. Please
                    //     add a new address to proceed.
                    //   </p>
                    //   <Button
                    //     className="px-6 py-2"
                    //     onClick={() => {
                    //       setEditingAddress(null);
                    //       setIsOpenModal(true);
                    //     }}
                    //   >
                    //     Add Address
                    //   </Button>
                    // </div>
                    <div className="col-span-2 min-h-[200px] flex items-center justify-center text-center py-8">
                      <p className="text-muted-foreground">
                        No delivery addresses found. Please add a new address.
                      </p>
                    </div>
                  ) : (
                    addresses.map((address: Address) => (
                      <Card
                        key={address._id}
                        className="transition-all duration-200 hover:shadow-lg hover:shadow-primary/15"
                      >
                        <CardContent className="flex flex-col sm:flex-row items-start justify-between gap-4 p-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">
                                {address.name}
                              </span>
                              {address.isDefault && (
                                <Badge className="bg-transparent rounded-full text-primary border-primary shadow-none">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm opacity-90">
                              {address.contactNumber}
                            </p>
                            <p className="text-sm opacity-90">
                              {address.address}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {!address.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefault(address._id)}
                                className="border-primary/20 h-9 hover:border-primary hover:bg-primary/5"
                              >
                                Set Default
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="icon"
                              // className={`${
                              //   address.isDefault
                              //     ? "border-white/20 hover:border-white hover:bg-white/10"
                              //     : "border-primary/20 hover:border-primary hover:bg-primary/5"
                              // }`}
                              onClick={() => handleEditAddress(address)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            {!address.isDefault && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    // className={`${
                                    //   address.isDefault
                                    //     ? "border-white/20 hover:border-white hover:bg-white/10"
                                    //     : "border-primary/20 hover:border-primary hover:bg-primary/5"
                                    // }`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Address
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      address? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-primary/20 hover:bg-primary/5">
                                      Cancel
                                    </AlertDialogCancel>

                                    <Button
                                      variant="destructive"
                                      onClick={() => handleDelete(address._id)}
                                      disabled={deleteAddressState.isLoading}
                                      isLoading={deleteAddressState.isLoading}
                                    >
                                      Delete
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </>
  );
}
