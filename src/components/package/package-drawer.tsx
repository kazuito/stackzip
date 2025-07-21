import { Package } from "@/lib/packages";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import PackageDetails from "./package-details";

type Props = {
  pkg: Package | null;
  onClose?: () => void;
};

const PackageDrawer = ({ pkg, onClose }: Props) => {
  const [displayPackage, setDisplayPackage] = useState(pkg);
  const isDesktop = useMedia("(min-width: 768px)");

  useEffect(() => {
    if (!pkg) return;
    setDisplayPackage(pkg);
  }, [pkg]);

  if (!displayPackage) return null;

  if (isDesktop) {
    return (
      <Dialog open={!!pkg} onOpenChange={onClose}>
        <DialogContent
          className="max-w-4xl! w-full mx-auto h-[90vh]"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{displayPackage.name}</DialogTitle>
          <PackageDetails pkg={displayPackage} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={!!pkg} onClose={onClose}>
      <DrawerContent className="max-w-5xl mx-auto h-[90vh]">
        <DrawerTitle className="sr-only">{displayPackage.name}</DrawerTitle>
        <PackageDetails pkg={displayPackage} />
      </DrawerContent>
    </Drawer>
  );
};

export default PackageDrawer;
