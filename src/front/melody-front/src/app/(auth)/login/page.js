"use client"

const LoginPage = () => {
    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-4">Authentication Page</h1>
            <div className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 border border-gray-300 rounded"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default LoginPage