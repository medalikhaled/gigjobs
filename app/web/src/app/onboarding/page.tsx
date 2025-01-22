"use client";

import { create } from "zustand";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import Confetti from "react-confetti";

const stepTitles = [
  "Tell Us About Yourself",
  "Your Professional Role",
  "Almost There!",
];

// Color variables
const colors = {
  primary: "#6366f1", // Indigo-500
  primaryLight: "#818cf8", // Indigo-400
  primaryDark: "#4f46e5", // Indigo-600
  background: "#eef2ff", // Indigo-50
  text: "#1e1b4b", // Indigo-950
  textLight: "#4f46e5", // Indigo-600
  accent1: "#06b6d4", // Cyan-500
  accent2: "#8b5cf6", // Violet-500
};

// Define the shape of our form data
interface FormData {
  fullName: string;
  age: string;
  gender: string;
  role: string;
  companyName: string;
  companySize: string;
  tosAgreed: boolean;
}

// Define the shape of our store
interface OnboardingStore {
  step: number;
  formData: FormData;
  setStep: (step: number) => void;
  setFormData: (data: Partial<FormData>) => void;
}

// Create the Zustand store
const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  formData: {
    fullName: "",
    age: "",
    gender: "",
    role: "",
    companyName: "",
    companySize: "",
    tosAgreed: false,
  },
  setStep: (step) => set({ step }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));

export default function Component() {
  const router = useRouter();
  const { step, formData, setStep, setFormData } = useOnboardingStore();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ tosAgreed: checked });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowConfetti(true);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.age && formData.gender;
      case 2:
        return (
          formData.role &&
          (formData.role !== "Employer" ||
            (formData.companyName && formData.companySize))
        );
      case 3:
        return formData.tosAgreed;
      default:
        return false;
    }
  };

  const dummyToS = `
    1. Acceptance of Terms
    By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.

    2. Description of Service
    The service provides users with [describe your service]. We reserve the right to modify or discontinue the service at any time.

    3. User Conduct
    You agree to use the service for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service.

    4. Intellectual Property
    The service and its original content, features, and functionality are owned by [Your Company] and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

    5. Termination
    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

    6. Governing Law
    These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.

    7. Changes to Terms
    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.

    By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.

    8. Contact Us
    If you have any questions about these Terms, please contact us at [your contact information].
  `;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Card
        className="mx-auto w-full max-w-5xl"
        style={{ backgroundColor: colors.background }}
      >
        <CardHeader className="relative">
          <CardTitle className="text-3xl font-bold">
            <span className="bg-gradient-to-br from-indigo-800 to-teal-500 bg-clip-text text-transparent">
              {stepTitles[step - 1]}
            </span>
          </CardTitle>
          <CardDescription style={{ color: colors.textLight }}>
            Let's get you set up!
          </CardDescription>
          <div
            className="absolute right-6 top-6 text-sm font-medium"
            style={{ color: colors.primary }}
          >
            Step {step}-3
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 1 && (
                <div className="w-full space-y-4">
                  <div>
                    <Label htmlFor="fullName" style={{ color: colors.text }}>
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="focus:border-primaryDark w-full border-primary"
                      style={{ borderColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" style={{ color: colors.text }}>
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="focus:border-primaryDark w-full border-primary"
                      style={{ borderColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: colors.text }}>Gender</Label>
                    <RadioGroup
                      name="gender"
                      value={formData.gender}
                      onValueChange={(value: string) =>
                        handleRadioChange("gender", value)
                      }
                      required
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" style={{ color: colors.text }}>
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" style={{ color: colors.text }}>
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="w-full space-y-4">
                  <div>
                    <Label style={{ color: colors.text }}>Role</Label>
                    <RadioGroup
                      name="role"
                      value={formData.role}
                      onValueChange={(value: string) =>
                        handleRadioChange("role", value)
                      }
                      required
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Employer" id="employer" />
                        <Label
                          htmlFor="employer"
                          style={{ color: colors.text }}
                        >
                          Employer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Employee" id="employee" />
                        <Label
                          htmlFor="employee"
                          style={{ color: colors.text }}
                        >
                          Employee
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <AnimatePresence>
                    {formData.role === "Employer" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full space-y-4"
                      >
                        <div>
                          <Label
                            htmlFor="companyName"
                            style={{ color: colors.text }}
                          >
                            Company Name
                          </Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className="focus:border-primaryDark w-full border-primary"
                            style={{ borderColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="companySize"
                            style={{ color: colors.text }}
                          >
                            Company Size
                          </Label>
                          <Input
                            id="companySize"
                            name="companySize"
                            type="number"
                            value={formData.companySize}
                            onChange={handleInputChange}
                            required
                            className="focus:border-primaryDark w-full border-primary"
                            style={{ borderColor: colors.primary }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              {step === 3 && (
                <div className="w-full space-y-4">
                  <ScrollArea
                    className="h-60 w-full rounded-md border p-4"
                    style={{ borderColor: colors.primary }}
                  >
                    <div className="text-sm" style={{ color: colors.text }}>
                      {dummyToS.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tosAgreed"
                      checked={formData.tosAgreed}
                      onCheckedChange={handleCheckboxChange}
                      required
                    />
                    <Label htmlFor="tosAgreed" style={{ color: colors.text }}>
                      I agree to the Terms of Service
                    </Label>
                  </div>
                  {showConfetti && (
                    <Confetti
                      width={window.innerWidth}
                      height={window.innerHeight}
                      recycle={false}
                      numberOfPieces={200}
                      colors={[
                        colors.primary,
                        colors.primaryLight,
                        colors.primaryDark,
                        colors.accent1,
                        colors.accent2,
                      ]}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Back
              </Button>
            )}
          </div>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.accent1}, ${colors.accent2})`,
              color: "white",
              transition: "all 0.3s ease",
            }}
            className="hover:opacity-90"
          >
            {step === 3 ? "Hop In" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
