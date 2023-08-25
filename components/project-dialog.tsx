import ProjectForm from "./project-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ open, onClose } : Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Criar novo projeto</DialogTitle>
        </DialogHeader>
        <ProjectForm onClick={onClose} />
      </DialogContent>
    </Dialog>
  )
}
