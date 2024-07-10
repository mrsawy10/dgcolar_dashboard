import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <div className="flex flex-col flex-auto items-center justify-center min-w-0">
        <h1 className="   text-teal-400">Test</h1>
      </div>
      {/* <BlogView /> */}
    </>
  );
}
