<?php

namespace App\Helpers;

use App\Models\Section;
use App\Models\Site;
use Illuminate\Support\Facades\Storage;

class GeneralHelper
{
    /**
     * Escape special characters for a LIKE query.
     *
     * @param string $value
     * @param string $char
     * @return string
     */
    public static function escapeLike(string $value, string $char = '\\'): string
    {
        return str_replace(
            [ $char, '%', '_' ],
            [ $char.$char, $char.'%', $char.'_' ],
            $value
        );
    }

    /**
     * Generate data url from asset contents.
     *
     * @param string $path
     * @return string
     */
    public static function getDataUrl($path): string
    {
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        return 'data:image/'.$extension.';base64,'.base64_encode(file_get_contents($path));
    }

    /**
     *  Replace query string paramaters given an URL string and and array of parameters
     *  to replace with.
     *
     * @param array $newValues
     * @param string $url
     * @return string
     */
    public static function replaceQueryStringParameters(array $newValues, string $url): string
    {
        if (strpos($url, '?') === false) {
            $url .= '?';
        }

        foreach ($newValues as $paramName => $paramValue) {
            if (strpos($url, $paramName) === false) {
                $url .= substr($url, -1) == '?' ? '' : '&';
                $url .= $paramName.'='.$paramValue.'&';
            } else {
                $url = preg_replace('/'.$paramName.'=[^&#]*/', $paramName.'='.$paramValue, $url);
            }
        }

        $url = rtrim($url, '&');

        return $url;
    }

    /**
     *  Append "http://" string if link does not contain it
     *
     * @param string|null $url
     * @return string
     */
    public static function getUrlWithHttp(?string $url): ?string
    {
        if (!empty($url) && strpos($url, 'http') === false && strpos($url, '#') === false) {
            $url = 'http://'.$url;
        }

        return $url;
    }

    /**
     *  Get url from public storage folder
     *
     * @param string|null $url
     * @return string
     */
    public static function getPublicUrl(?string $url): ?string
    {
        return !empty($url) ? Storage::disk('public')->url($url) : null;
    }

    /**
     * Delete first file if different from the second
     *
     * @param  string|null $prevFileUrl
     * @param  string|null $currentFileUrl
     * @param  string $disk
     * @return string
     */
    public static function deleteFileIfDifferent(?string $prevFileUrl, ?string $currentFileUrl, $disk = 'public'): void
    {
        if ($prevFileUrl != $currentFileUrl) {
            self::deleteFileAndFolder($prevFileUrl, $disk);
        }
    }

    /**
     * Delete file and containing folder if is not empty
     *
     * @param  string|null $fileUrl
     * @param  string $disk
     * @return void
     */
    public static function deleteFileAndFolder($fileUrl, $disk = 'public'): void
    {
        $fileName = basename($fileUrl);
        $folderPath = str_replace($fileName, "", $fileUrl);
        $isSeedFile = strpos($fileUrl, 'seed/') !== false;

        if (!$isSeedFile) {
            Storage::disk($disk)->delete($fileUrl);

            if (empty(Storage::disk($disk)->files($folderPath))) {
                Storage::disk($disk)->deleteDirectory($folderPath);
            }
        }
    }

    /**
     * Get current site from route slug
     *
     * @return Site|null
     */
    public static function getCurrentSite(): ?Site
    {
        $route = request()->route();
        $currentSite = null;

        if ($route) {
            $parameters = $route->parameters();
            $currentSite = array_key_exists('site', $parameters) ? $parameters['site'] : null;

            if (!$currentSite instanceof Site) {
                $currentSite = Site::where('slug', $currentSite)->first();
            }
        }

        return $currentSite;
    }

    /**
     * Get current site from route slug
     *
     * @param int $lastBackgroundColor
     * @return int
     */
    public static function getNextBackgroundColor($lastBackgroundColor): int
    {
        return in_array(
            $lastBackgroundColor,
            [
                Section::BACKGROUND_TYPE_WHITE,
                Section::BACKGROUND_TYPE_BRAND_COLOR,
            ]
        ) ? Section::BACKGROUND_TYPE_SOFT_GRAY : Section::BACKGROUND_TYPE_WHITE;
    }

    /**
     * Check if URL is from youtube
     *
     * @param string $url
     * @return bool
     */
    public static function isYoutubeUrl(string $url): bool
    {
        $isYoutubeDomain = strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false;
        $isYoutubeVideo = preg_match('/v=[a-zA-Z]+/', $url) || preg_match('/youtu\.be\/[a-zA-Z]+/', $url);

        return $isYoutubeDomain && $isYoutubeVideo;
    }
}
