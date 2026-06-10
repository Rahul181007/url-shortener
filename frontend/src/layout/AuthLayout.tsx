type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
