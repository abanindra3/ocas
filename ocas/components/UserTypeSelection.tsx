import { Button } from "@/components/ui/button";
interface UserTypeSelectionProps {
  setUserType: (userType: 'admin' | 'customer' ) => void; // Allow null for resetting
}

export default function UserTypeSelection({ setUserType }: UserTypeSelectionProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-bold text-white">OCAS - Online Canteen Automation System</h1>
        <p className="text-xl text-white">Please select your user type:</p>
        <div className="space-x-4">
          <Button
            onClick={() => setUserType('admin')}
            className="bg-blue-500 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-600"
          >
            Admin
          </Button>
          <Button
            onClick={() => setUserType('customer')}
            className="bg-green-500 px-8 py-3 text-lg font-semibold text-white hover:bg-green-600"
          >
            Customer
          </Button>
        </div>
      </div>
    </div>
  );
}