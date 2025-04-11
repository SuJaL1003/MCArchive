const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 border-t mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center items-center text-center">
                <p className="text-purple-700 font-bold text-lg">
                    © {new Date().getFullYear()} MCA Notes. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
export default Footer;
