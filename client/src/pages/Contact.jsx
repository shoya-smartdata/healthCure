function Contact() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Contact Us</h1>
          <p className="text-lg text-gray-700 text-center">
            For inquiries, please reach out to us at{" "}
            <a href="mailto:support@doctorapp.com" className="text-blue-500 hover:underline">
              support@doctorapp.com
            </a>
          </p>
        </div>
      </div>
    );
  }
  
  export default Contact;
  