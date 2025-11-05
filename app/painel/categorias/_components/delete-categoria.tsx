'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { excluirCategoria } from '../actions'
import { Trash2 } from 'lucide-react'

interface DeleteCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function DeleteCategoria({ categoria }: DeleteCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    setLoading(true)
    setError('')
    
    const result = await excluirCategoria(categoria.id)
    
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
        <Button variant="destructive" size="sm">
          <Trash2 className="size-4" />
          Excluir
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Excluir Categoria</SheetTitle>
          <SheetDescription>
            Tem certeza que deseja excluir a categoria &quot;{categoria.nome}&quot;?
            Esta ação não pode ser desfeita.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <SheetFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

