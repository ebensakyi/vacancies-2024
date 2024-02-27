const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© WAECGH Recruitment System</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Crafted with <i className="mdi mdi-heart text-danger" /> by{" "}
              <a
                href="https://waecgh.org/"
                target="_blank"
                className="text-reset"
                rel="noreferrer"
              >
                WAEC Ghana
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
