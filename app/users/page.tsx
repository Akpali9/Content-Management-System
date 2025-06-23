import { UsersTable } from "@/components/users-table"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UsersPage({
  searchParams,
}: {
  searchParams: { created?: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Link href="/users/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      {searchParams.created && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>User created successfully! They will appear in the list below.</AlertDescription>
        </Alert>
      )}

      <UsersTable />
    </div>
  )
}
