import { useState } from 'react';
import './LoginModal.css';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [loginType, setLoginType] = useState<'donor' | 'admin'>('donor');

    if (!isOpen) return null;

    return (
        <div className="modal-overlay glass-panel glass-blur" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2>{loginType === 'donor' ? 'Donor Login' : 'Admin Access'}</h2>
                    <p>Welcome to Arunya. Please login to continue.</p>
                </div>

                <div className="login-tabs">
                    <button
                        className={`tab-btn ${loginType === 'donor' ? 'active' : ''}`}
                        onClick={() => setLoginType('donor')}
                    >
                        Donor
                    </button>
                    <button
                        className={`tab-btn ${loginType === 'admin' ? 'active' : ''}`}
                        onClick={() => setLoginType('admin')}
                    >
                        Admin
                    </button>
                </div>

                {loginType === 'donor' ? (
                    <div className="login-form">
                        <button className="btn btn-google">
                            <span className="google-icon">G</span> Login with Google
                        </button>
                        <div className="divider"><span>OR</span></div>
                        <input type="email" placeholder="Email Address" className="form-input" />
                        <input type="password" placeholder="Password" className="form-input" />
                        <InteractiveHoverButton text="Login / Sign Up" className="w-full" />
                    </div>
                ) : (
                    <div className="login-form admin-login">
                        <div className="admin-notice">
                            Admin access requires manual verification by the backend team.
                        </div>
                        <button className="btn btn-google">
                            <span className="google-icon">G</span> Login with Google Workspace
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
