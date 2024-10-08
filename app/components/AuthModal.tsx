import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export function AuthModal() {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
    </Dialog>
  )
}
