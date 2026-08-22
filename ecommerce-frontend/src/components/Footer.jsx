function Footer() {
    return (
        <footer className="bg-[#2B2320] text-[#F3E9DD] mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-display text-xl mb-3">Estele</h3>
                    <p className="text-sm text-[#C9B8A5] leading-relaxed">
                        Handcrafted fashion jewellery, made to make every moment shine.
                    </p>
                </div>

                <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#C9A227] mb-3">Shop</h4>
                    <ul className="text-sm text-[#C9B8A5] space-y-2">
                        <li>New Arrivals</li>
                        <li>Best Sellers</li>
                        <li>Collections</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#C9A227] mb-3">Support</h4>
                    <ul className="text-sm text-[#C9B8A5] space-y-2">
                        <li>Contact Us</li>
                        <li>Returns &amp; Exchange</li>
                        <li>Shipping Info</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-[#3D342C] text-center py-5 text-xs text-[#8A7B6E]">
                © 2026 Estele. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;