import Button from '@/components/cta/Buttons'
import { useAuthStore } from '@/store/authStore'

export default function LogoutButton() {
  const logout = useAuthStore((store) => store.logout)
  return (
    <Button variant="secondary" onClick={() => logout()}>
      Logout
    </Button>
  )
}