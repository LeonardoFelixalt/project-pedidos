'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { editarCategoria } from '../actions'
import { Pencil } from 'lucide-react'

interface EditCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function EditCategoria({ categoria }: EditCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    const result = await editarCategoria(categoria.id, formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="size-4" />
          Editar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form action={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Editar Categoria</SheetTitle>
            <SheetDescription>
              Atualize o nome da categoria.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nome">Nome da Categoria</FieldLabel>
                <Input
                  id="nome"
                  name="nome"
                  defaultValue={categoria.nome}
                  placeholder="Ex: Bebidas, Lanches..."
                  required
                  disabled={loading}
                />
              </Field>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </FieldGroup>
          </div>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

