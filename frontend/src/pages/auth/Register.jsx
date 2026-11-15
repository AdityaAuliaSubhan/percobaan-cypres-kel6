
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import {
    FaTools,
    FaUser,
    FaLock,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";

import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Register() {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        no_whatsapp: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (dataForm.password !== dataForm.password_confirmation) {
            setError("Konfirmasi password tidak sama.");
            return;
        }

        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name: dataForm.name,
                    email: dataForm.email,
                    no_whatsapp: dataForm.no_whatsapp,
                    password: dataForm.password,
                }
            );

            setSuccess(response.data.message || "Registrasi berhasil!");

            setDataForm({
                name: "",
                email: "",
                no_whatsapp: "",
                password: "",
                password_confirmation: "",
            });

        } catch (error) {
            console.error("Registrasi gagal:", error);

            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const firstError = Object.values(errors)[0];
                setError(firstError[0]);
            } else if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(
                    "Tidak dapat terhubung ke server. Periksa koneksi Laravel."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[460px] min-h-[560px] bg-white rounded-[24px] px-[48px] py-[34px] shadow-lg my-6">

            <div className="flex flex-col items-center">
                <FaTools className="text-[#143b63] text-[58px] mb-5" />

                <h1 className="text-[26px] font-extrabold text-black mb-7">
                    REGISTER
                </h1>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-300 mb-5 px-4 py-3 text-sm text-red-700 rounded-lg flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 mr-2 text-lg shrink-0" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-300 mb-5 px-4 py-3 text-sm text-green-700 rounded-lg">
                    {success}
                    <p className="mt-2">
                        Silakan <Link to="/login" className="font-bold underline">Login</Link> menggunakan akun yang sudah dibuat.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {/* Username */}
                <div className="mb-5">
                    <label className="block text-[12px] font-extrabold text-black mb-2">
                        USERNAME
                    </label>

                    <div className="h-[38px] bg-[#dfe9f7] rounded-[7px] flex items-center px-3">
                        <FaUser className="text-[#3d5577] text-[18px] mr-4" />

                        <input
                            type="text"
                            name="name"
                            value={dataForm.name}
                            onChange={handleChange}
                            placeholder="Username"
                            autoComplete="username"
                            className="w-full h-full bg-transparent outline-none border-none text-[13px] text-[#3d5577] placeholder:text-[#b7bfca]"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="block text-[12px] font-extrabold text-black mb-2">
                        EMAIL
                    </label>

                    <div className="h-[38px] bg-[#dfe9f7] rounded-[7px] flex items-center px-3">
                        <FaEnvelope className="text-[#3d5577] text-[18px] mr-4" />

                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            placeholder="Email"
                            autoComplete="email"
                            className="w-full h-full bg-transparent outline-none border-none text-[13px] text-[#3d5577] placeholder:text-[#b7bfca]"
                            required
                        />
                    </div>
                </div>

                {/* Nomor WhatsApp */}
                <div className="mb-5">
                    <label className="block text-[12px] font-extrabold text-black mb-2">
                        NOMOR WHATSAPP
                    </label>

                    <div className="h-[38px] bg-[#dfe9f7] rounded-[7px] flex items-center px-3">
                        <FaPhone className="text-[#3d5577] text-[16px] mr-4" />

                        <input
                            type="tel"
                            name="no_whatsapp"
                            value={dataForm.no_whatsapp}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                            autoComplete="tel"
                            className="w-full h-full bg-transparent outline-none border-none text-[13px] text-[#3d5577] placeholder:text-[#b7bfca]"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="block text-[12px] font-extrabold text-black mb-2">
                        PASSWORD
                    </label>

                    <div className="h-[38px] bg-[#dfe9f7] rounded-[7px] flex items-center px-3">
                        <FaLock className="text-[#3d5577] text-[18px] mr-4" />

                        <input
                            type="password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            placeholder="Kata Sandi"
                            autoComplete="new-password"
                            className="w-full h-full bg-transparent outline-none border-none text-[13px] text-[#3d5577] placeholder:text-[#b7bfca]"
                            required
                        />
                    </div>
                </div>

                {/* Konfirmasi Password */}
                <div className="mb-8">
                    <label className="block text-[12px] font-extrabold text-black mb-2">
                        KONFIRMASI PASSWORD
                    </label>

                    <div className="h-[38px] bg-[#dfe9f7] rounded-[7px] flex items-center px-3">
                        <FaLock className="text-[#3d5577] text-[18px] mr-4" />

                        <input
                            type="password"
                            name="password_confirmation"
                            value={dataForm.password_confirmation}
                            onChange={handleChange}
                            placeholder="Konfirmasi Kata Sandi"
                            autoComplete="new-password"
                            className="w-full h-full bg-transparent outline-none border-none text-[13px] text-[#3d5577] placeholder:text-[#b7bfca]"
                            required
                        />
                    </div>
                </div>

                {/* Tombol Daftar */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-[270px] h-[42px] text-white rounded-[7px] font-extrabold text-[15px] block mx-auto transition-all ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#3d5577] hover:bg-[#2f4566]"
                    }`}
                >
                    {loading ? "PROCESSING..." : "DAFTAR"}
                </button>

                <p className="text-center text-[#3d5577] text-[10px] mt-4">
                    Sudah punya akun?{" "}
                    <Link to="/login" className="font-bold hover:underline">
                        Login
                    </Link>
                </p>

            </form>
        </div>
    );
}
