import { useSelector } from "react-redux";
import { AppRouter } from "./routes/AppRouter"
import { Loader } from "./@components";

export const PruebaMPApp = () => {
  const { loading } = useSelector((state) => state.loading);

  return (
    <>
      {loading && <Loader />}
      <AppRouter />
    </>
  )
}