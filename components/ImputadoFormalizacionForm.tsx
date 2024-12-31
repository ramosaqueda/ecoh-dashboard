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
import { Calendar } from "@/components/ui/calendar"
import {SquarePen } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ImputadoFormalizacionProps {
    causaId: number,
    imputadoId: number
}

const ImputadoFormalizacionForm :React.FC<ImputadoFormalizacionProps>= ({causaId, imputadoId}) => {
    const form = useForm({
        defaultValues: {
          estaFormalizado: "",
          fechaFormalizacion: "",
          medidaCautelar: "",
          plazo: ""

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
              <Switch id="estaFormalizado" />
              <Label htmlFor="estaFormalizado">Formalizado</Label>
                <FormProvider {...form}>
                  <form onSubmit={handleSubmit(updatePlazo)}>
                    <FormField
                      control={control}
                      name="fechaFormalizacion"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha Formalización</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Seleccione una fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="plazo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plazo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingrese la cantidad de días"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="medidaCautelar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medida Cautelar</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingrese la cautelar"
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