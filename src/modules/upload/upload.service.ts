import { Injectable } from '@nestjs/common';
import { supabase } from './supabase.provider';
import { imgConverterToWebp } from '@/utils/imgConverterToWebp.util';

@Injectable()
export class UploadService {
async uploadFile(file: Express.Multer.File) {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const bufferWebp = await imgConverterToWebp(file);
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(fileName, bufferWebp, {
                contentType: 'image/webp',
                upsert: true
            });

        if (error) {
            throw new Error(`Erro ao enviar: ${error.message}`);
        }
        
        return data;
    }
    async listPath() {
        const { data, error } = await supabase.storage.from('uploads')
            .list('', { 
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'desc' },
            });

        if (error) throw new Error(error.message);
        return data.map(file => file.name);
    }



    async deleteFile(path: string) {
        const { data, error } = await supabase.storage.from('uploads').remove([path]);

        if (error) {
            throw new Error(`Erro ao deletar: ${error.message}`);
        }

        return { message: 'Removido com sucesso', data };
    }
}
