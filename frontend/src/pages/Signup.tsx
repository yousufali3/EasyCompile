import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "@/utils/handleError";
import { useSignupMutation } from "../redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "../redux/slices/appSlice";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-6">
      <div className="__form_container bg-black border-[1px] py-12 px-8 flex flex-col gap-8 w-[400px]">
        <div className="">
          <h1 className="font-mono text-5xl font-bold text-left">Signup</h1>
          <p className="font-mono text-base">
            Join the community of expert frontend developers🧑‍💻.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Username"
                      {...field}
                      className="text-lg py-3 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="text-lg py-3 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="text-lg py-3 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              loading={isLoading}
              className="w-full text-lg py-3"
              type="submit"
            >
              Signup
            </Button>
          </form>
        </Form>
        <small className="text-base font-mono">
          Already have an account?{" "}
          <Link className="text-blue-500 text-lg" to="/login">
            Login
          </Link>
          .
        </small>
      </div>
    </div>
  );
}
