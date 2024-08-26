import "./pageStyles/grid.css";
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
import { useLoginMutation } from "../redux/slices/api";
import { handleError } from "@/utils/handleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "../redux/slices/appSlice";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-6">
      <div className="__form_container bg-black border-[1px] py-12 px-8 flex flex-col gap-8 w-[400px]">
        <div className="">
          <h1 className="font-mono text-5xl font-bold text-left">Login</h1>
          <p className="font-mono text-base">Welcome back fellow coder 😁</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      placeholder="Username or Email"
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
                      required
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
              Login
            </Button>
          </form>
        </Form>
        <small className="text-base font-mono">
          Don't have an account?{" "}
          <Link className="text-blue-500 text-lg" to="/signup">
            Signup
          </Link>
          .
        </small>
      </div>
    </div>
  );
}
