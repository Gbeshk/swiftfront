import React from "react";
import { Check, Crown, Star } from "lucide-react";
import { DashCompanyProfile, DashPlanOption } from "@/app/common/types/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface DashUpgradePlanModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profile: DashCompanyProfile;
  upgrading: boolean;
  upgradingPlan: string | null;
  handleUpgradePlan: (planMode: string) => void;
}

const DashUpgradePlanModal: React.FC<DashUpgradePlanModalProps> = ({
  isOpen,
  setIsOpen,
  profile,
  upgrading,
  upgradingPlan,
  handleUpgradePlan,
}) => {
  const planOptions: DashPlanOption[] = [
    {
      name: "Free",
      mode: "free",
      price: "$0",
      priceDetail: "Forever",
      maxFiles: 10,
      maxEmployees: 1,
      features: [
        "10 files per month",
        "1 team member",
        "Basic support",
        "Standard features",
      ],
      icon: <Star className="w-5 h-5" />,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
    },
    {
      name: "Basic",
      mode: "basic",
      price: "$5",
      priceDetail: "per user/month",
      maxFiles: 100,
      maxEmployees: 10,
      features: [
        "100 files per month",
        "Up to 10 team members",
        "Priority support",
        "Advanced features",
      ],
      icon: <Star className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: true,
    },
    {
      name: "Premium",
      mode: "premium",
      price: "$300",
      priceDetail: "per month",
      maxFiles: 1000,
      maxEmployees: "unlimited",
      features: [
        "1000 files per month",
        "Unlimited team members",
        "24/7 premium support",
        "All features included",
      ],
      icon: <Crown className="w-5 h-5" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-5xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-slate-800">
            <Crown className="w-7 h-7 text-amber-600 mr-3" />
            Choose Your Plan
          </DialogTitle>
          <p className="text-slate-600 mt-3 text-lg">
            Select the plan that best fits your needs. You can upgrade or
            downgrade at any time.
          </p>
        </DialogHeader>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planOptions.map((plan) => (
              <div
                key={plan.mode}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
                  profile.mode === plan.mode
                    ? "border-emerald-500 bg-emerald-50 shadow-lg"
                    : `${plan.borderColor} ${plan.bgColor}`
                } ${
                  plan.popular
                    ? "ring-4 ring-blue-500 ring-opacity-30 scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                {profile.mode === plan.mode && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${plan.bgColor} ${plan.borderColor} border-2 mb-6 shadow-sm`}
                  >
                    <span className={plan.color}>{plan.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 text-base ml-2">
                      /{plan.priceDetail}
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 font-medium">
                      Files per month:
                    </span>
                    <span className="font-bold text-slate-800">
                      {plan.maxFiles}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 font-medium">
                      Team members:
                    </span>
                    <span className="font-bold text-slate-800">
                      {plan.maxEmployees === "unlimited"
                        ? "Unlimited"
                        : plan.maxEmployees}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-base"
                    >
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleUpgradePlan(plan.mode)}
                  disabled={upgrading || profile.mode === plan.mode}
                  className={`w-full h-14 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    profile.mode === plan.mode
                      ? "bg-emerald-600 hover:bg-emerald-600 text-white cursor-default"
                      : plan.mode === "free"
                      ? "bg-slate-600 hover:bg-slate-700 text-white"
                      : plan.mode === "basic"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-violet-600 hover:bg-violet-700 text-white"
                  }`}
                >
                  {upgrading && upgradingPlan === plan.mode ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : profile.mode === plan.mode ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Current Plan
                    </>
                  ) : plan.mode === "free" ? (
                    "Downgrade to Free"
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="h-12 px-8 rounded-xl text-lg font-semibold"
            disabled={upgrading}
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashUpgradePlanModal;
