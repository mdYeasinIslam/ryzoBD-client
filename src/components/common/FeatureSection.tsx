import Image from "next/image";
import React from "react";
import bestPrice from "../../../public/svg/best-price.svg";
import refund from "../../../public/svg/refund.svg";
import delivery from "../../../public/svg/free-delivery.svg";

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
      <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
        <div className="bg-transparent p-3 rounded-lg">
          <Image
            src={bestPrice}
            priority
            alt="best price"
            className="w-14 h-12"
          />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-foreground">
            Best Price & Deals
          </h4>
          <p className="text-muted-foreground">
            Do not miss our daily amazing deals and unbeatable prices
          </p>
        </div>
      </div>
      <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
        <div className="bg-transparent p-3 rounded-lg">
          <Image
            src={refund}
            priority
            alt="refund policy"
            className="w-14 h-12"
          />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-foreground">
            Money Back Guarantee
          </h4>
          <p className="text-muted-foreground">
            If your items have any damage, we agree to refund it promptly
          </p>
        </div>
      </div>
      <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
        <div className="bg-transparent p-3 rounded-lg">
          <Image src={delivery} priority alt="delivery" className="w-14 h-12" />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-foreground">
            Quality Assurance
          </h4>
          <p className="text-muted-foreground">
            We ensure the best quality of our products for your satisfaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
