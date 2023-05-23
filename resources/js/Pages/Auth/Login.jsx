import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Panino" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="w-full flex-1 text-center flex flex-col items-center justify-center"
            >
                <h1 className="font-semibold text-xl">Effettua l'accesso</h1>
                <h3 className=" text-gray-400">
                    Inserisci la tua email aziendale e codice della tua azienda
                </h3>
                <div className="flex flex-col gap-2 mx-auto container my-4">
                    <div className="px-2 lg:px-16">
                        <div className="rounded border border-gray-200 flex items-center px-2 h-10">
                            <input
                                type="email"
                                autoComplete="new-password"
                                name="email"
                                id="email"
                                className="!outline-none text-gray-700 flex-1 px-1"
                                placeholder="esempio@azienda.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="px-2 lg:px-16">
                        <div className="rounded border border-gray-200 flex items-center px-2 h-10">
                            <input
                                type="password"
                                autoComplete="new-password"
                                name="password"
                                id="password"
                                className="!outline-none text-gray-700 flex-1 px-1"
                                placeholder="Codice azienda"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="px-2 lg:px-16">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Ricorda questo account in questo browser
                            </span>
                        </label>
                    </div>
                    <div className="px-2 lg:px-32">
                        <button
                            type="submit"
                            className="bg-gray-700 w-full rounded p-2 text-white"
                            disabled={processing}
                        >
                            Accedi
                        </button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}

// return (
//     <GuestLayout>
//         <Head title="Log in" />

//         <form onSubmit={submit}>
//             <div>
//                 <InputLabel htmlFor="email" value="Email" />

//                 <TextInput
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     autoComplete="username"
//                     isFocused={true}
//                     onChange={(e) => setData("email", e.target.value)}
//                 />

//                 <InputError message={errors.email} className="mt-2" />
//             </div>

//             <div className="mt-4">
//                 <InputLabel htmlFor="password" value="Password" />

//                 <TextInput
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={data.password}
//                     className="mt-1 block w-full"
//                     autoComplete="current-password"
//                     onChange={(e) => setData("password", e.target.value)}
//                 />

//                 <InputError message={errors.password} className="mt-2" />
//             </div>

//             <div className="block mt-4">
//                 <label className="flex items-center">
//                     <Checkbox
//                         name="remember"
//                         checked={data.remember}
//                         onChange={(e) =>
//                             setData("remember", e.target.checked)
//                         }
//                     />
//                     <span className="ml-2 text-sm text-gray-600">
//                         Remember me
//                     </span>
//                 </label>
//             </div>

//             <div className="flex items-center justify-end mt-4">
//                 {canResetPassword && (
//                     <Link
//                         href={route("password.request")}
//                         className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         Forgot your password?
//                     </Link>
//                 )}

//                 <PrimaryButton className="ml-4" disabled={processing}>
//                     Log in
//                 </PrimaryButton>
//             </div>
//         </form>
//     </GuestLayout>
// );
