import { Suspense } from "react";
import { PackagePageClient } from "./_components/package-page-client";

export default function PackagePage() {
  return (
    <Suspense>
      <PackagePageClient />
    </Suspense>
  );
}
