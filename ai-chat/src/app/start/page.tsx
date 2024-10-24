'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { pageTransition, buttonAnimation } from '../components/animations'; 

export default function StartPage(){
  return (
    //アニメーション
    <motion.div 
    className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
    initial={pageTransition.initial}
    animate={pageTransition.animate}
    exit={pageTransition.exit}
    transition={pageTransition.transition}
    >
      {/* タイトル */}
      <h1 className="text-4xl font-bold mb-8 text-black">ようこそAIチャットへ！</h1>

      {/* ボタン */}
      <Link href="/wang">
      <motion.button 
      {...buttonAnimation}
      className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg text-xl"
      >
        スタート！
      </motion.button>
      </Link>
    </motion.div>
  );
}