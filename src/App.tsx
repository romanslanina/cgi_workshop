import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type BuildEnvironment = "dev" | "test" | "uat" | "prod" | undefined;

const getBuildEnvironment = (): BuildEnvironment => {
  const buildEnv = import.meta.env.VITE_BUILD_FOR as string | undefined;

  if (!buildEnv) return undefined;

  const normalizedEnv = buildEnv.toLowerCase();

  if (
    normalizedEnv === "dev" ||
    normalizedEnv === "test" ||
    normalizedEnv === "uat" ||
    normalizedEnv === "prod"
  ) {
    return normalizedEnv;
  }

  return undefined;
};

const getEnvironmentColorClass = (env: BuildEnvironment): string => {
  switch (env) {
    case "dev":
      return "bg-green-200";
    case "test":
      return "bg-blue-200";
    case "uat":
      return "bg-amber-200";
    case "prod":
      return "bg-red-200";
    default:
      return "bg-gray-200";
  }
};

export const App = () => {
  const [count, setCount] = useState(0);

  const borderColor = useMemo(() => {
    const buildEnv = getBuildEnvironment();

    return getEnvironmentColorClass(buildEnv);
  }, []);

  return (
    <div className={`fixed inset-0 ${borderColor}`}>
      <div className="absolute inset-4 bg-gray-50 flex flex-col items-center justify-center gap-4 overflow-auto">
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              FE aplikace
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold text-primary">{count}</div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCount((count) => count + 1)}
              className="w-full"
            >
              Přičíst
            </Button>
          </CardContent>
          <CardFooter className="text-center text-muted-foreground flex flex-col gap-2">

            <p className="text-center w-full">
              {import.meta.env.VITE_BUILD_FOR}
            </p>
          </CardFooter>
        </Card>

        <Alert variant="destructive" className="w-[350px] animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Kritická chyba!</AlertTitle>
          <AlertDescription>
            Toto je kritická chyba, oprav mne.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
