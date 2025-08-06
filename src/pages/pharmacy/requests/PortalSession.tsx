import React from "react";

const PortalSession: React.FC<any> = ({
    vncSession, handleCloseSession, isClosingSession, isVncLoading, firefoxStatusMsg
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br z-[9999] from-zinc-900 via-gray-900 to-gray-800 flex flex-col items-center fixed inset-0 left-0 right-0 bottom-0 top-0">
            <div className="w-full h-full bg-black flex flex-col">
                <div className="bg-zinc-900 p-4 flex justify-between items-center border-b border-zinc-700">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-white">CMM Session - {vncSession.entityName}</h2>
                        <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Connected</span>
                    </div>
                    <button
                        onClick={handleCloseSession}
                        disabled={isClosingSession}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                    >
                        {isClosingSession ? 'Closing...' : 'Close Session'}
                    </button>
                </div>
                <div className="flex-1 relative">
                    {(isVncLoading || isClosingSession) && (
                        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-10">
                            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-xl text-white">{isClosingSession ? 'Cleaning up session...' : 'Loading CMM Session...'}</p>
                            {!isClosingSession && <p className="text-sm text-gray-300 mt-2">{firefoxStatusMsg}</p>}
                        </div>
                    )}
                    {!isVncLoading && !isClosingSession && (
                        <iframe
                            src={vncSession.vncUrl}
                            className="w-full h-full"
                            style={{ border: 'none' }}
                            title="VNC Session"
                        />
                    )}
                </div>
            </div>
            <style>{`
            .animate-fade-in { animation: fadeIn 1.2s ease; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
            .animate-spin-slow { animation: spin 6s linear infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
    )
};

export default PortalSession;