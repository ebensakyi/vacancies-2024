
export default async function Page() {


    return (<>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../assets/images/favicon.png"
        />
        <title>Elite Admin Template - The Ultimate Multipurpose admin template</title>
        <link href="dist/css/style.min.css" rel="stylesheet" />
        <link href="dist/css/pages/error-pages.css" rel="stylesheet" />
        <section id="wrapper" className="error-page">
          <div className="error-box">
            <div className="error-body text-center">
              <h1>404</h1>
              <h3 className="text-uppercase">Page Not Found !</h3>
              <p className="text-muted m-t-30 m-b-30">
                YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
              </p>
              <a
                href="index.html"
                className="btn btn-info btn-rounded waves-effect waves-light m-b-40 text-white"
              >
                Back to home
              </a>{" "}
            </div>
          </div>
        </section>
      </>
      )
        
        }