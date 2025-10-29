'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { redirect } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {

  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name =  formData.get("name") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    authClient.signUp.email({
	    name: name,
      email: email,
      password: senha
    },
    {
      onSuccess: () => redirect("/login"),
      onRequest: () => setloading(true),
      onResponse:() => setloading(false),
      onError: (ctx) => setError(ctx.error.message)
    }
  
  )
  }

  return (
	<Card>
		<CardHeader>
			<CardTitle>Create an account</CardTitle>
			<CardDescription>
				Enter your details below to create your account
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form onSubmit={handleLogin}>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="name">Nome</FieldLabel>
						<Input id="name" name="name" placeholder="Seu nome" required />
					</Field>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input id="email" type="email" name="email" placeholder="seu@email.com" required />
					</Field>
					<Field>
						<FieldLabel htmlFor="senha">Senha</FieldLabel>
						<Input id="senha" type="password" name="senha" placeholder="••••••••" required />
					</Field>
					<Field>
						<Button disabled={loading} type="submit">{loading ? <Loader2 className="animate-spin" /> : "Login"}</Button>
						<Button variant="outline" type="button">Continue with Google</Button>
						<FieldDescription className="text-center">
							Already have an account? <a href="/login">Login</a>
						</FieldDescription>
					</Field>
				</FieldGroup>
				{error && error}
			</form>
		</CardContent>
	</Card>
	)

}