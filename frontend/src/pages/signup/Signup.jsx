import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto h-screen">
			<div className="w-full p-6 rounded-lg shadow-lg bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-lg border border-gray-500/30">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Sign Up
					<span className="text-red-500"> ChatApp </span>
				</h1>

				<form>
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-300">
								Full Name
							</span>
						</label>
						<input
							type="text"
							placeholder="Enter your full name"
							className="w-full input input-bordered h-10"
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-300">
								Username
							</span>
						</label>
						<input
							type="text"
							placeholder="Enter your username"
							className="w-full input input-bordered h-10"
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-300">
								Password
							</span>
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							className="w-full input input-bordered h-10"
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-300">
								Confirm Password
							</span>
						</label>
						<input
							type="password"
							placeholder="Confirm your password"
							className="w-full input input-bordered h-10"
						/>
					</div>

					<GenderCheckbox />

					<a
						href="#"
						className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-gray-300">
						{"Already have an account? Login"}
					</a>

					<div>
						<button className="btn btn-block btn-sm mt-2">Sign Up</button>
					</div>
				</form> 
			</div>
		</div>
	);
};

export default SignUp;
