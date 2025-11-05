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
import { criarCategoria } from '../actions'
import { Plus } from 'lucide-react'

export default function AddCategorias() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    const result = await criarCategoria(formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
      // Reset form
      const form = document.getElementById('add-categoria-form') as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Adicionar Categoria
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form id="add-categoria-form" action={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Adicionar Categoria</SheetTitle>
            <SheetDescription>
              Preencha o nome da categoria que deseja adicionar.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nome">Nome da Categoria</FieldLabel>
                <Input
                  id="nome"
                  name="nome"
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

