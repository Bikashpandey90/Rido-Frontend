import { Car, Mail, MapPin, Phone } from "lucide-react"
import { NavLink } from "react-router-dom"

const Footer = () => {
    return <footer className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container max-w-7xl justify-self-center  px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="space-y-4">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                            <Car className="absolute inset-0 h-5 w-5 m-auto text-white" />
                        </div>
                        <span className="font-bold text-xl">RideX</span>
                    </NavLink>
                    <p className="text-muted-foreground">
                        The modern way to get around town. Safe, reliable, and affordable rides at your fingertips.
                    </p>
                    <div className="flex space-x-4">
                        <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Twitter</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </NavLink>
                        <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                        </NavLink>
                        <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Facebook</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </NavLink>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-medium">Company</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Careers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Press
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Blog
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-medium">Information</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Cities
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Fare Estimate
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                How it Works
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="text-muted-foreground hover:text-foreground">
                                Safety
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4 sm:col-span-2 md:col-span-1">
                    <h3 className="font-medium">Contact</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">+1 (555) 000-0000</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">support@ridex.com</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">123 Main St, City, Country</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RideX. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <NavLink to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </NavLink>
                        <NavLink to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </NavLink>
                        <NavLink to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Cookie Policy
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer;