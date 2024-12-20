//ImputadoFormalizacionForm.tsx
import { useForm, FormProvider } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { SquarePen } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface ImputadoFormalizacionProps {
    causaId: number,
    imputadoId: number
}

const ImputadoFormalizacionForm :React.FC<ImputadoFormalizacionProps>= ({causaId, imputadoId}) => {
    const form = useForm({
        defaultValues: {
          plazo: "",
        },
      });
      const { handleSubmit, control } = form;

    const updatePlazo = async (data: { plazo: string }) => {
        try {
            const updatePlazoResponse = await fetch(`/api/causas-imputados?causaId=${causaId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" 
                }, body: JSON.stringify({
                    imputadoId: imputadoId,
                    plazo: parseInt(data.plazo)
                })

            })

        } catch(error) {
            console.error("Error al actualizar plazo: ", error);
        }
        console.log("Nuevo Plazo:", data.plazo);
       
    };
    
    return (
        <Dialog>
          <DialogTrigger>
            <Button>
              <SquarePen />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Plazo</DialogTitle>
              <DialogDescription>
                <FormProvider {...form}>
                  <form onSubmit={handleSubmit(updatePlazo)}>
                    <FormField
                      control={control}
                      name="plazo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Ingrese la cantidad de días"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-4">
                      Guardar
                    </Button>
                  </form>
                </FormProvider>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
};

export default ImputadoFormalizacionForm;