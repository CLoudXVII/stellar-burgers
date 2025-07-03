interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

// TODO: Заменить плейсхолдер
export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) =>
  children;
