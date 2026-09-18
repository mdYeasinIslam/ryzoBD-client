"use client";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useMyPackageQuery } from "@/redux/features/packages/packages-api";
import PackageBuilder from "@/components/packages/package-builder";
export default function EditMyPackagePage() {
  const { id } = useParams<{ id: string }>();
  const owner = useAppSelector(s => s.auth.user._id) || "";
  const { currentData: data, isFetching, isError, refetch } = useMyPackageQuery({ id, owner }, { skip: !owner, refetchOnMountOrArgChange: true });
  if (!data && isFetching) return <p>Loading package…</p>;
  if (isError) return <p role="alert">Package unavailable. <button onClick={() => refetch()}>Retry</button></p>;
  return data ? <PackageBuilder key={id} initial={data.data.package} /> : null;
}
