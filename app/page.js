// "use client";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { useSession, signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function VariantB() {
//   const router = useRouter();
//   const { data: session } = useSession();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const res = await fetch("/api/signUp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         Username: data.Username,
//         email: data.email,
//         password: data.password,
//       }),
//     });

//     const result = await res.json();
//     if (result.success) router.push("/login");
//   };

//   useEffect(() => {
//     if (session) router.push("/chat");
//   }, [session, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#000000] px-4 py-10">
//       <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 flex flex-col items-center">
//         <h2 className="text-2xl font-bold mb-4 text-white">
//           Join ALPHA — it's free
//         </h2>
//         <p className="text-sm text-gray-300 mb-6">
//           Create your account to start building and sharing links.
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
//           <input
//             {...register("Username", { required: true })}
//             placeholder="Display name"
//             className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
//           />
//           {errors.Username && (
//             <div className="text-xs text-red-500">Required</div>
//           )}

//           <input
//             type="email"
//             {...register("email", { required: true })}
//             placeholder="Email"
//             className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
//           />
//           {errors.email && <div className="text-xs text-red-500">Required</div>}

//           <input
//             type="password"
//             {...register("password", { required: true, minLength: 3 })}
//             placeholder="Password"
//             className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
//           />
//           {errors.password && (
//             <div className="text-xs text-red-500">Min 3 chars</div>
//           )}

//           <button className="w-full py-3 rounded-xl bg-[#254F1A] text-[#D2E823] font-semibold hover:bg-[#3a7a2b] transition-all">
//             Create account
//           </button>
//         </form>

//         {/* Already have account */}
//         <div className="w-full mt-4 text-center">
//           <p className="text-gray-300 text-sm">
//             Already have an account?{" "}
//             <a
//               href="/login"
//               className="text-[#D2E823] font-semibold hover:underline hover:text-[#b4cc1a] transition"
//             >
//               Log in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VariantB() {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMsg("");

    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: data.Username,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/login");
    } else {
      setErrorMsg("Email already exists");
    }
  };

  useEffect(() => {
    if (session) router.push("/chat");
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#000000] px-4 py-10">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Join ALPHA — it's free
        </h2>
        <p className="text-sm text-gray-300 mb-6">
          Create your account to start building and sharing links.
        </p>

        {errorMsg && (
          <div className="w-full mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <input
            {...register("Username", { required: true })}
            placeholder="Display name"
            className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
          />
          {errors.Username && (
            <div className="text-xs text-red-500">Required</div>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
          />
          {errors.email && <div className="text-xs text-red-500">Required</div>}

          <input
            type="password"
            {...register("password", { required: true, minLength: 3 })}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#254F1A]"
          />
          {errors.password && (
            <div className="text-xs text-red-500">Min 3 chars</div>
          )}

          <button className="w-full py-3 rounded-xl bg-[#254F1A] text-[#D2E823] font-semibold hover:bg-[#3a7a2b] transition-all">
            Create account
          </button>
        </form>

        <div className="w-full mt-4 text-center">
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#D2E823] font-semibold hover:underline hover:text-[#b4cc1a] transition"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
