//ImputadoFormalizacionForm.tsx

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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/hooks/use-toast"
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

const ImputadoFormalizacionForm :React.FC<>= ({}) => {
    
    return (
        <Dialog>
            <DialogTrigger>
                <Button >
                    <SquarePen/>
                </Button>
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Plazo</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form>
                                <FormField
                                    control={}
                                    name="plazo"
                                    render={({field}) => (
                                        <FormItem>
                                        <FormLabel>Plazo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="ingrese la cantidad de dias" {... field} />
                                            </FormControl>
                                    </FormItem>
                                    )}
                                    
                                />
                            </form>
                            
                        </Form>
                        
                        

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        
    );
};

export default ImputadoFormalizacionForm;